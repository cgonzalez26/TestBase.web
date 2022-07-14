export const environment = {
    production: true,
    hmr: false,
    localStorageAuthDataItem: "ATIBaseWebLSProduction", // ACCIÓN NECESARIA: RENOMBRAR (EJ. ATICopaLecheWebLSProduction)
    localStorageEditItem: 'ATIBaseWebLSProduction',
    api: {
        auth: "http://localhost:44301/",//"http://localhost:58425/",
        base: "http://localhost:44301/api/", // ACCIÓN REQUERIDA: CONFIGURAR LA URL DE LA API LOCAL
    },
    google: {
        maps: {
            apiKey: "PUT_YOUR_GOOGLE_MAPS_API_KEY_HERE", // ACCIÓN OPCIONAL: CONFIGURAR LA API KEY PARA GOOGLE MAPS SI CORRESPONDE.
        },
    },
    scope: "base.api", // ACCIÓN REQUERIDA: CONFIGURAR "scope" PARA LA API CONFIGURADA EN "api.base" (EJ. copaleche.api, SOLICITAR A ALGUN ADMINISTRADOR)
    appCode: "COD_BASE_WEB", // ACCIÓN REQUERIDA: CONFIGURAR "appCode" PARA EL SISTEMA CORRESPONDIENTE (EJ. COD_COPADELECHE, SOLICITAR A ALGUN ADMINISTRADOR)
    appName: "ATI.Base.Web", // ACCIÓN OPCIONAL: CONFIGURAR NOMBRE DE LA APLICACIÓN
    appVersion: "1.0.0", // ACCIÓN OPCIONAL: CONFIGURAR VERSIÓN DE LA APLICACIÓN
    appVersionDate: "30/04/2021", // ACCIÓN OPCIONAL: CONFIGURAR FECHA DE LA APLICACIÓN
};
