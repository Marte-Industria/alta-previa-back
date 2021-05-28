import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { VERSION_API } from '../constants';
import { HEALTH_RES_OK } from '../../tests/mocks/health-mocks'

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
                        'socialRed': {
                            'type': 'object',
                            'properties': {
                                'username': {
                                    'type': 'string',
                                    'example': 'abbulrodriguez'
                                },
                                'url': {
                                    'type': 'string',
                                    'format': 'url',
                                    'example': 'www.instagram.com'
                                },
                                'isVisible': {
                                    'type': 'boolean',
                                    'example': true
                                }
                            }
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
                'RestorePassword': {
                    'type': 'object',
                    'properties': {
                        'email': {
                            'type': 'string',
                            'format': 'email',
                            'example': 'eybul@gmail.com'
                        },
                        'password': {
                            'type': 'string',
                            'format': 'password',
                            'example': 'admin01'
                        }
                    }
                },
                'ChangePassword': {
                    'type': 'object',
                    'properties': {
                        'password': {
                            'type': 'string',
                            'format': 'password',
                            'example': 'admin01'
                        }
                    }
                },
                'INever': {
                    'type': 'object',
                    'properties': {
                        'level': {
                            'type': 'string',
                            'enum': ['normal', 'semi'],
                            'example': 'normal'
                        },
                        'body': {
                            'type': 'string',
                            'example': 'Yo nunca programe en powerBuilder'
                        },
                        'is_spicy': {
                            'type': 'boolean',
                            'example': true
                        }
                    }
                },
                'Synonym': {
                    'type': 'object',
                    'properties': {
                        'type': {
                            'type': 'string',
                            'enum': ['insult', 'idiom'],
                            'example': 'idiom'
                        },
                        'key': {
                            'type': 'string',
                            'example': 'girl'
                        },
                        'value': {
                            'type': 'string',
                            'example': 'mina'
                        },
                        'country': {
                            'type': 'string',
                            'example': 'ar'
                        }
                    }
                }
            },
            'parameters': {
                'isSpacy': {
                    'name': 'is_spacy',
                    'in': 'query',
                    'description': 'Picante',
                    'required': true,
                    'schema': {
                        'type': 'boolean',
                        'example': true
                    }
                },
                'level': {
                    'name': 'level',
                    'in': 'query',
                    'description': 'nivel del juego',
                    'required': true,
                    'schema': {
                        'type': 'string',
                        'example': 'normal'
                    }
                },
                'id': {
                    'name': 'id',
                    'in': 'path',
                    'description': 'id del documento',
                    'required': true,
                    'schema': {
                        'type': 'string',
                        'example': '60affbd8467b34ee48d6ebf6'
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
            'examples': {
                'health-ok': HEALTH_RES_OK,
                'rostro-ok': ['asd'],
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
                    'scheme': "bearer",
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