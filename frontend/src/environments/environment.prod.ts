export const environment = {
    production: true,
    appName: 'Hub - Guno Store',
    appPrefix: 'app_hub_guno_prod_',
    version: 'v1.0.20240919141400',
    administratorPrefix: "admin",
    maintenanceMode: false,
    theme: 'light', // light | dark
    language: {
        default: 'vi',
        list: [
            {
                language: 'Tiếng Việt',
                code: 'vi',
                type: 'VN',
                icon: '/assets/images/flags/icon-flag-vi.svg',
            },
            {
                language: 'English',
                code: 'en',
                type: 'US',
                icon: '/assets/images/flags/icon-flag-en.svg',
            }
        ]
    },
    roles: {
        superAdmin: 1,
        admin: 2,
        user: 3,
        warehouseManager: 4,
        warehouseStaff: 6,
        accountant: 10,
        livestream: 11,
        productionDepartment: 12
    },
    rsa: {
        isActive: true,
        server: {
            publicKeyEncode: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFqUU9pVGpXV1BCMFFYU0RYQzFNMApmSDB5dXplL2hQR2FLRlk1a3V0RFhPOGFhb2hyYkVNMDR5bFNjS0U1d01Nbzg2RjIvY01YdTIweXhDSDZBN1AxCk9nY2g2RXBLNC92RVNIVzgzeVN5c0g3ODBHNkI0SUh3TE9PdHpOS0ZPWlNFd1cxSzN4K09md3NzS3NJcTdycFAKMVBSbml3MGloZ3d5WHF4VzZOL0RQcU8vRGoxS0MvelZkSTU3MEJqMUllZXVRSlo4c1F1MDUrNkcvVGlrOHFjQgpZczF0TzY3N2UwSDZoaTI5SnBnVFZ6Z2FlYjdHL1hUTk9yOWtwaDhnWVg4bW5SZEFUWnI4OGptTUNJOVdta0FhClZONFd2UzdGRUt6Qk5pTUZpOWlSU0ZFMUJqK0Jvbi9zWkhpWVplUks0MFBpU0luOWZqL0RpSDd0bXJSZmFUVG8KS3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'
        }
    },
    vapid: {
        publicKey: 'BK67UXna_aqIN4PxpQq7DMc7u5UFyIo4hashySfNIMalb27Xxz-kx8UJFM8TA7xisSfrF5_CkUnL5f52hwThXOw'
    },
    google: {
        auth: {
            clientId: '890785478712-6k01lld5c22n3vieph08sa82pd1q47ch.apps.googleusercontent.com' // Guno Mate Store
        }
    },
    facebook: {
        appId: '1880964099092754'
    },
    tiktokShop: {
        authUrl1: 'https://services.tiktokshop.com/open/authorize?service_id=7198348875182081798&state=',
        authUrl2: 'https://services.tiktokshop.com/open/authorize?service_id=7447079768378771205&state='
    },
    socket: {
        enabled: true,
        mode: 'socket',
        path: '/ws/socket.io',
        url: ''
    },
    backendServer: {
        host: '',
        port: 443,
        ssl: true,
        prefix: '/api/v1/',
        url: '',
        paths: {
            auth: {
                login: "auth/login",
                social: {
                    login: 'auth/social/login',
                    request: "auth/{SOCIAL_NAME}/request",
                    callback: "auth/{SOCIAL_NAME}/callback",
                }
            },
            core: {
                settings: {
                    get: 'core/settings/get'
                },
                pushNotification: {
                    subscribe: 'core/push-notification/subscribe'
                }
            },
            administrator: {
                role: {
                    list: 'core/role/list',
                    checkNameExist: 'core/role/check-name-exist',
                    create: 'core/role/create',
                    update: 'core/role/{ROLE_ID}/update',
                    delete: 'core/role/{ROLE_ID}/delete'
                },
                user: {
                    list: 'core/user/list',
                    create: 'core/user/store',
                    update: 'core/user/{USER_ID}/update',
                    setRole: 'core/user/{USER_ID}/set-role',
                    switchUser: 'core/user/switch-user',
                    editAvatar: 'core/user/update-avatar',
                    changePassword: 'user/{USER_ID}/change-password'
                },
                route: {
                    list: 'core/route/list',
                    import: 'core/route/import',
                    update: 'core/route/{ROUTE_ID}/update'
                },
                permission: {
                    details: 'core/permission',
                    set: 'core/permission/set',
                    setDomain: 'core/permission/set-domain',
                    setExtra: 'core/permission/set-extra',
                    setUserRole: 'core/permission/set-role/user'
                }
            },
            gunoHub: {
                order: {
                    search: 'order/search',
                    detail: 'order/{ORDER_ID}'
                },
                product: {
                    search: 'product/search',
                    update: 'product/update/{TYPE}'
                },
                warehouse: {
                    supplier: {
                        search: 'warehouse/supplier/search'
                    },
                    sku: {
                        search: 'warehouse/product/sku/search',
                        export: 'warehouse/product/sku/export',
                        update: 'warehouse/product/sku/update/{TYPE}'
                    },
                    inventory: {
                        search: 'warehouse/inventory/search',
                        receipt: {
                            create: 'warehouse/inventory/receipt/create',
                            search: 'warehouse/inventory/receipt/search',
                            detail: 'warehouse/inventory/receipt/{NUMBER}'
                        },
                        delivery: {
                            create: 'warehouse/inventory/delivery/create',
                            search: 'warehouse/inventory/delivery/search',
                            detail: 'warehouse/inventory/delivery/{NUMBER}',
                            detailOrder: 'warehouse/inventory/delivery/order/{NUMBER}'
                        },
                        history: {
                            search: 'warehouse/inventory/history/search'
                        }

                    },
                    stats: {
                        sku: {
                            top: 'warehouse/stats/sku/top'
                        }
                    },
                    stocktaking: {
                        create: 'warehouse/stocktaking/create',
                        search: 'warehouse/stocktaking/search',
                        detail: 'warehouse/stocktaking/{NUMBER}',
                    }
                },
                finance: {
                    dept: {
                        search: 'finance/dept/search',
                        detail: 'finance/dept/{NUMBER}'
                    }
                },
            },
            report: {
                overview: {
                    dashboard: 'report/overview/dashboard'
                }
            },
            queue: {
                api: {
                    queues: 'queue/api/queues',
                    clean: 'queue/api/queues/{QUEUE_NAME}/clean/{STATUS}',
                    cleanJob: 'queue/api/queues/{QUEUE_NAME}/{JOB_ID}/clean',
                    retryJob: 'queue/api/queues/{QUEUE_NAME}/{JOB_ID}/retry/failed',
                    retryAll: 'queue/api/queues/{QUEUE_NAME}/retry/failed'
                }
            }
        }
    }
}
