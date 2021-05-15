import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { VERSION_API } from '../constants';

// Reference: https://swagger.io/specification
// Example: https://petstore3.swagger.io
const swaggerDocs = swaggerJsdoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API AltaPrevia',
            description: 'receives all requests from the mobile application',
            version: VERSION_API,
            contact: {
                name: 'Martes Producciones',
                email: 'martes@marteproducciones.com.ar'
            },
        },
        tags:[
            {
                name :"Health"
            },
            {
                name :"Security"
            },
            {
                name :"User"
            }
        ],
        servers: [
            {
                url: `http://localhost:3000`,
                description: 'Local server',
            },
            {
                url: `https://martes.atr.cumbia.gato.piola`,
                description: `Entorno de produccion`,
            }
        ],
        components: {
            'schemas': {
                'Response': {
                    'type': 'object',
                    'properties': {
                        'message': {
                            'type': 'string',
                        },
                        'data': {
                            'type': 'object'
                        }
                    }
                },
                'User': {
                    'type': 'object',
                    'properties': {
                        'firstName': {
                            'type': 'string',
                            'example': 'Abbul'
                        },
                        'lastName': {
                            'type': 'string',
                            'enum': ['m', 'f'],
                            'example': 'Rodriguez'
                        },
                        'alias': {
                            'type': 'string',
                            'example': 'eybul'
                        },
                        'email': {
                            'type': 'string',
                            'format': 'email',
                            'example': 'eybul@gmail.com'
                        },
                        'password': {
                            'type': 'string',
                            'format': 'password',
                            'example': 'admin01'
                        },
                        'country': {
                            'type': 'string',
                            'example': 'AR'
                        },
                        'city': {
                            'type': 'string',
                            'example': 'caba'
                        }
                    }
                },
                'Pdf417': {
                    'type': 'object',
                    'properties': {
                        'type': {
                            'type': 'string',
                            'enum': ['front', 'back'],
                            'example': 'front'
                        },
                        'image': {
                            'type': 'string',
                            'format': 'base64',
                            'example': 'data:image/jpeg;base64,/9j/4...'
                        }
                    }
                }
            },
            'parameters': {
                'ioi': {
                    'name': 'internalOperationId',
                    'in': 'header',
                    'description': 'Internal uuidv4 code',
                    'required': true,
                    'schema': {
                        'type': 'string',
                        'example': '75442486-0878-440c-9db1-a7006c25a39f'
                    }
                },
                'dni': {
                    'name': 'dni',
                    'in': 'query',
                    'description': 'del usuario',
                    'required': true,
                    'schema': {
                        'type': 'string',
                        'example': '30333666'
                    }
                }
            },
            'responses': {
                'Default': {
                    'description': 'Default Response',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Response'
                            }
                        }
                    }
                },
                'NotFound': {
                    'description': 'Entity not found.'
                }
            },
            'mocks': {
                'health-ok': {},
                'rostro-ok': {},
                'pdf417-ok': {},
                'new-operation-ok': {},
                'retry-discount-ok': {}
            },
            "securitySchemes": {
                "basicAuthentication": {
                    'type': 'http',
                    'scheme': 'basic'
                },
                "bearerAuthorization": {
                    'type': "http",
                    'scheme':"bearer",
                    'bearerFormat': "JWT"
                }
            }
        },
        externalDocs:
        {
            'description': 'Documentacion del Proyecto',
            'url': 'https://www.clarin.com/espectaculos/fama/pablo-lescano-explico-significa-frase-atr-perro-cumbia-cajeteala-piola-gato_0_BmcuXV-UK.html'
        }
    },
    apis: ['./src/routes/*-route.ts']
})

const swaggerUiSetup = setup(swaggerDocs)

export {
    serve as swaggerUiServe,
    swaggerUiSetup
};