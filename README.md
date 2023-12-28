# Economic Indicators Chile

This repository contains a collection of economic indicators for Chile. The data is collected from the [Central Bank of Chile](https://www.bcentral.cl/estadisticas/estadisticas-mercado/mercado-credito/mercado-credito.aspx). For now you can know the following indicators:

1. UF (Unidad de Fomento)
2. UTM (Unidad Tributaria Mensual)
3. IPC (Indice de Precios al Consumidor)
4. USD (Dolar Observado)
5. EUR (Euro Observado)

> [!NOTE]  
> You don't need to use an API key to use this API.

## Get all indicators

### HTTPS REQUEST

`GET https://economic-api.cam1pozas.xyz/api `

or

`GET https://economic-api.camipg.com/api`

## Get specific currency

`GET https://economic-api.cam1pozas.xyz/api?currency=name`

or

`GET https://economic-api.camipg.com/api?currency=name`

### URL Parameters

| Parameter | Description                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| name      | The name of the currency you want to get. The name must be in lowercase. For example: `uf`, `utm`, `ipc`, `usd`, `eur` |

> [!TIP]
> You can filter in upper or lower case. Is not case sensitive.

## Get many currencies

`GET https://economic-api.cam1pozas.xyz/api?currency=name1,name2,name3`

or

`GET https://economic-api.camipg.com/api?currency=name1,name2,name3`

| Parameter | Description                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| name1     | The name of the currency you want to get. The name must be in lowercase. For example: `uf`, `utm`, `ipc`, `usd`, `eur` |
| name2     | idem                                                                                                                   |

## Status Codes

This API uses the following status codes:
Status Code | Description
------------ | -------------
200 | OK
400 | Bad Request
404 | Not Found
500 | Internal Server Error
