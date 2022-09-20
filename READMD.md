# 个人静态资源API接口

## 返回数据约定

```JSON
{
    "status": {
        "code": Number,
        "msg": String
    },
    "data": Any
}
```

### status.code
- 200 返回数据正常
- 601 参数错误


## 待优化

- 当前数据以**JSON**格式明文储存，读写速度存在瓶颈，数据分类粒度不够