# kup-qlik



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Type            | Default     |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| `appid`        | `appid`        | Set Qlik App's id would you like to use How to find app id --> https://support.qlik.com/articles/000026239                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `string`        | `''`        |
| `bordered`     | `bordered`     | Set gird border                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `boolean`       | `false`     |
| `config`       | --             | Set Qlik Server's connection parameters {host:'<server host>', port:'<server port http default:80 https default:443 >', prefix:'<virtual proxy prefix dafault: blank>', isSecure:<true/false>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `QlikServer`    | `undefined` |
| `defobjsize`   | `defobjsize`   | Set default obj's container pixel height                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `string`        | `'400px'`   |
| `doconnection` | `doconnection` | Do connection to Qlik Sever, if you have more component only one must have doconnection = "true"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `boolean`       | `false`     |
| `fluid`        | `fluid`        | Define width of grid, with true width = 100% responsive, false 1200px                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `boolean`       | `false`     |
| `grid`         | --             | Set the grid structure (JSON) selections --> Data selection array     field   --> Qlik field on which to make the selection     values  --> Array of int or string value which to select rows     colums --> they define the structure of grid       obj     --> Qlik Object id would you like to render (How to find Qlik obj id --> https://help.qlik.com/en-US/sense-developer/June2020/Subsystems/Mashups/Content/Sense_Mashups/Howtos/mashups-obtain-app-object-id.htm)       colDim  --> define column's dimension, it could have values from 1 to 10 where 10 is 100%       size    --> define size height of obj's div container, it colud have this values XS\|S\|M\|L\|XL   Example: { selections:[   {       field: 'Anno',       values:[2020]   } ], rows:[   {     columns:[         {             obj:'KvqdmD', colDim:5, size:'L'         },         {             obj:'JjSaVm', colDim:5, size:'S'         }     ]   } ] } | `KupQlikGrid[]` | `[]`        |
| `qlik`         | `qlik`         | System prop                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `any`           | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*