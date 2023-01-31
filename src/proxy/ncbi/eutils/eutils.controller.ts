import { Controller, Get, Query } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { EutilsService } from './eutils.service'

@Controller('/proxy/ncbi/eutils')
export class EutilsController {
  constructor(
    private readonly eutilsService: EutilsService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getEutild() {
    return this.eutilsService.getEutils()
  }

  // https://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.ESearch
  @Get('esearch')
  async callEsearch(
    @Query()
    params: {
      db: string
      term: string
      usehistory?: string
      WebEnv?: string
      query_key?: string
      retstart?: string
      retmax?: string
      rettype?: string
      retmode?: 'json' | 'xml'
      sort?: string
      field?: string
      idtype?: string
      datetype?: string
      reldate?: number
      mindate?: string
      maxdate?: string
    },
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${this.eutilsService.getApiPrefix()}/esearch.fcgi`,
      {
        params,
      },
    )

    return data
  }

  // http://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch
  @Get('efetch')
  async callEfetch(
    @Query()
    params: {
      db: string
      id: string
      query_key?: string
      WebEnv?: string
      retmode?: 'text' | 'xml' | 'asn.1'
      rettype?:
        | 'docsum'
        | 'uilist'
        | 'xml'
        | 'full'
        | 'summary'
        | 'gene_table'
        | 'alignmentscores'
        | 'fasta'
        | 'homologene'
        | 'native'
        | 'acc'
        | 'seqid'
        | 'gb'
        | 'gbc'
        | 'gbwithparts'
        | 'fasta_cds_na'
        | 'gp'
        | 'gpc'
        | 'ipg'
        | 'medline'
        | 'abstract'
        | 'flt'
        | 'rsr'
        | 'ssexemplar'
        | 'chr'
        | 'clinvarset'
        | 'gtracc'
      retstart?: string
      retmax?: string
      strand?: string
      seq_start?: string
      seq_stop?: string
      complexity?: string
    },
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${this.eutilsService.getApiPrefix()}/efetch.fcgi`,
      {
        params,
      },
    )

    return data
  }
}
