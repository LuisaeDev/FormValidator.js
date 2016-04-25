# FormValidator.js

### Versión
>1.0.1

Valida formularios HTML de una manera limpia, elegante y eficiente. No requiere de otras dependencias como jQuery para su utilización.

---

# Características
- Fácil de aprender e implementar
- Orientado a objetos
- No requiere dependencias, no necesita de jQuery
- Permite extender tus propias reglas de validación
- Puedes personalizar todos los mensajes
- Soporte para módulos AMD

---

# Primeros pasos
## 1. Instalación
A través bower
```
bower install VoyagerCodes/FormValidator.js --save
```
O puedes descargar la última versión aquí https://github.com/VoyagerCodes/FormValidator/releases


## 2. Carga la librería
Carga el archivo de javascript **FormValidator.js** o **FormValidator.min.js** directamente en tu proyecto
```html
<script src="myVendorPath/FormValidator/FormValidator.js">
```
Carga la librería como módulo AMD
```javascript
define([ 'myVendorPath/FormValidator/FormValidator' ], function(FormValidator) {
    ...
});
```
## 3. Prepara tu HTML
Agrega un formulario a tu documento HTML, no es necesario ningún esquema de etiquetas, atributos o clases especiales, solo un formulario común con todos sus campos. El fomulario será seleccionado a través de su **id** o su atributo **name**, y sus campos se seleccionarán a través de su atributo **name**.
```html
<form id="myForm" name="myForm">
    <input type="text" name="email" />
    <input type="password" name="pass" />
    <button type="submit">Login</button>
</form>
```
## 4. Es hora de Javascript!
Al cargar **FormValidator.js** se registrará la clase **FormValidator** en el contexto **window** con la cuál podrás crear múltiples instancias para validar los formularios que necesites. Si estás cargando módulos AMD puedes acceder a la clase directamente por el argumento en donde se ha cargado el módulo.

```javascript
var validator = new FormValidator({
    form: '#myForm',
    fields: {
        email: {
            rules: {
                required: true,
                type: 'email'
            }
        },
        pass: {
            rules: {
                required: true,
                'min-length': 4,
                'max-length': 12
            }
        }
    }
}).fail(function(errors, evt) {
    console.log('El formulario contiene varios errores');

}).success(function(values, evt) {
    console.log('Formulario validado correctamente!');
    
});
```
---
# Documentación

### Constructor
- **new FormValidator**(options)

### Propiedades
- **form**
- **preventDefault**
- **context**

### Métodos
- **always**(callback)
- **change**(callback)
- **checkField**(fieldName)
- **extendRule**(ruleName, ruleMessage, ruleValidator)
- **extendType**(typeName, typeValidator)
- **fail**(callback)
- **getError**()
- **getErrors**()
- **getField**(fieldName)
- **getValue**(fieldName)
- **isValid**(fieldName)
- **replaceMessage**(ruleName, ruleMessage)
- **setField**(fieldName, fieldOptions)
- **setFields**(fields)
- **submit**()
- **success**(callback)
- **validate**(callback)

## Construcción de instancias
La función constructora de la clase FormValidator solo acepta un argumento de tipo Object, en el cuál se definen múltiples opciones para la validación del formulario.
```javascript
// Construcción de una instancia FormValidator 
var validator = new FormValidator({

    // Especifica el formulario por su id '#myForm' o por su atributo name 'myForm'
    form: '#myForm',
    
    // (Opcional) Contexto a aplicar en las funciones callback, ej: success(), fail(), change(), etc.
    // Al no especificar el contexto se utilizará el contexto de la instancia misma
    context: this,
    
    // (Opcional) Determina si se debe prevenir el envío del formulario al validarse, por default el valor es true
    preventDefault: false,
    
    // Especifica los múltiples campos que se desean validar
    fields: {
    
        // Cada campo es identificado por su atributo name
        age: {
            rules: {
                ...
            }
        },
        
        // Se puede especificar múltiples campos al mismo tiempo
        'link1, link2, link3': {
            rules: {
                ...
            }
        }
    }
});
```

## Registro de campos
Los campos del formulario se pueden registrar al momento de construir la instancia **FormValidator** o a través de los métodos **setFields()** y **setField()**. Los campos que no estén registrados serán ignorados por la instancia.
```javascript
var validator = new FormValidator({
    form: '#myForm',
    fields: {
        age: {
            
            // Nombre especial del campo para personalizar los mensajes de error
            label: 'Edad',
            
            // Puedes especificar todas las reglas que requieras para validar el campo
            rules: {
                required:    true,
                type:        'numeric',
                'min-range': 0,
                'max-range': 100
            },
            
            // Puedes personalizar los mensajes de error para cada regla
            messages: {
                required: 'El campo %label es requerido',
                type: 'Has ingresado una edad inválida',
                'max-range': 'No puedes ingresar un valor mayor que %param en el campo %label'
            },
            
            // Puedes capturar el evento change al cambiar el valor del campo
            change: function(field, error, evt) {
                console.log('El campo ' + field.name + ' ha cambiado el valor:');
                console.log(field.value);
            }
        },
        
        // Aqui puedes registrar más campos si necesitas
        ...
    }
})

// Algunos métodos de la instancia se pueden utilizar por encadenamiento

// También puedes utilizar el método setFields() para registrar varios campos
.setFields({
    email: {
        ...
    },
    pass: {
        ...
    },
    'confirm-pass': {
        ...
    },
    // Al registrar múltiples campos separados por coma, todas las reglas y mensajes serán aplicadas a estos campos
    'link1, link2, link3': {
        ...
    }
})

// Utiliza el método setField() para registrar un campo
.setField('age', {
    label: 'Edad',
    rules: {
        ...
    },
    messages: {
        ...
    },
    change: function(field, error, evt) {
        ...
    }
});
```

## Reglas de validación
Puedes utilizar las siguientes reglas para validar los campos:
```javascript
rules: {
    required:       true,
    type:           'email',
    match:          'fieldName', // El nombre de otro campo registrado en esta instancia
	'min-length':    2,
	'max-length':    10,
	length:          5,
	'min-range':     0,
	'max-range':     10,
	'regex':          /^[a-z]+$/i,
	'file-ext':      'jpg' || [ 'jpg', 'png' ],
	'file-mime':     'image/jpeg' || [ 'image/jpeg', 'image/png' ],
	'file-min-size': 2, // MB
	'file-max-size': 10, // MB
	validate:        function(value, field) {
	    if (field.value == 1) {
		    return true;
	    } else {
		    return false;
	    }
	}
}
```

## Regla type
La regla type soporta por default los siguientes valores:

| Tipo             | Descripción                             |
|------------------|-----------------------------------------|
| **email**        | Correo electrónico                      |
| **emails**       | Correos electrónicos                    |
| **letters**      | Caracteres de [a-z]                     |
| **letters-dash** | Caracteres de [a-z] y [-]               |
| **numbers**      | Caracteres de [a-z]                     |              
| **numbers-dash** | Caracteres de [0-9] y [-]               |              
| **integer**      | Valores enteros positivos y negativos   |
| **float**        | Valores decimales positivos y negativos |
| **url**          | URL                                     |
| **ip**           | IP                                      |
| **file**         | Archivo                                 |

## Capturar eventos
Puedes capturar eventos de un campo y del formulario con los métodos siguientes:
```javascript
var validator = new FormValidator({
    form: '#myForm',
    myField: {
        rules: {
            ...
        },
        
        // Puedes capturar el evento change de este campo cuando cambie su valor
        change: function(field, error, evt) {
            if (error) {
                console.log('Ocurrió un error en el campo ' +  field.name);
                console.log(error.message);
            } else {
                console.log('El valor de este campo es:');
                console.log(field.value);
            }
            
            // Puedes utlizar field.el para obtener el elemento HTML del campo
            if (error) {
                $(field.el).addClass('error');
            } else {
                $(field.el).removeClass('error');
            }
        }
    }
})

// Algunos métodos de la instancia se pueden utilizar por encadenamiento

// Este método registra una función callback que se llama cada vez que un campo del formulario cambia de valor
.change(function(field, error, evt) {
    if (error) {
        console.log('Ocurrió un error en el campo ' +  field.name);
        console.log(error.message);
    }
})

// Este método registra una función callback que es llamada cuando falla el envío del formulario
.fail(function(errors, evt) {

    // En el argumento errors se reciben los múltiples errores producidos al validar el formulario
    for (var i in errors) {
        console.log('Ocurrió un error en el campo ' +  errors[i].field.name);
        console.log(errors[i].message);
    }
})

// Este método registra una función callback que es llamada cuando el envío del formulario fue exitoso
.success(function(values, evt) {
    // Aqui puedes hacer una petición ajax y enviar todos los valores del formulario
    ...
});
```

## Validación del formulario
El formulario es validado cada véz que se realiza un submit:
```html
<input type="submit" value="Enviar">
<button type="submit">Enviar</button>
```

También puedes utilizar el método **submit()** o **validate()** de la instancia **FormValidator**

```javascript
validator.submit();
validator.validate();
```
***Nota: los campos que estén deshabilitados son ignorados durante la validación.***

## Extiende tus propias reglas
Puedes extender tus propias reglas a través del método **extendRule()**. Supongamos el siguiente ejemplo:
```html
<form id="myForm">
    <label>¿Cual es la raíz cuadrada de 225?</label>
    <input type="text" name="question1" />
    <button type="submit">Validar</button>
</form>
```
```javascript
var validator = new FormValidator({
    form: '#myForm',
    question1: {
        rules: {
            required: true,
            equal: 15
        }
});

/*
    Se extiende la regla 'equal' en la instancia
    Como segundo argumento se define el mensaje de error para la regla
    El tercer argumento es la función validadora para la regla
*/
validator.extendRule('equal', 'El valor del campo %label es incorrecto', function(value, param, field) {
    if (value == param) {
        return true;
    } else {
        return false;
    }
});

// La regla tambíen puede extenderse globalmente para toda la clase
FormValidator.prototype.extendRule('equal', 'El valor del campo %label es incorrecto', function(value, param, field) {
    if (value == param) {
        return true;
    } else {
        return false;
    }
});
```
## Extiende nuevos tipos para la regla type
Si necesitas extender nuevos tipos para la regla type, lo puedes realizar a través del método **extendType()**.
```javascript
var validator = new FormValidator({
    form: '#myForm',
    question1: {
        rules: {
            required: true,
            type: 'odd'
        }
});

/*
    Se extiende el tipo 'odd' en la instancia
    El segundo argumento es la función validadora para el tipo
*/
validator.extendType('odd', function(value, field) {
    if (value % 2) {
        return true;
    } else {
        return false;
    }
});

// El tipo tambíen puede extenderse globalmente para toda la clase
FormValidator.prototype.extendType('odd', function(value, field) {
    if (value % 2) {
        return true;
    } else {
        return false;
    }
});
```
