import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "home_group",
        title: "Home Group",
        translate: "NAV.PRINCIPAL.TITLE",
        type: "group",
        permission: "PAGES_HOME",
        children: [
            {
                id: "home",
                title: "Home",
                translate: "NAV.HOME.TITLE",
                type: "item",
                icon: "home",
                url: "/ui/home",
                permission: "PAGES_HOME",
            },            
            {
                id: "establecimientos",
                title: "Establecimientos",
                translate: "Establecimientos",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "location_city",
                url: "ui/management/establecimientos",
                permission: "PAGES_MANAGEMENT_",
            },
            {
                id: "impuestos_aut",
                title: "Impuestos Automotor",
                translate: "Impuestos Automotor",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "directions_car",
                url: "ui/management/impuestos_aut",
                permission: "PAGES_MANAGEMENT_IMPUESTOS_AUT",
            },
            {
                id: "impuestos_inm",
                title: "Impuestos Inmuebles",
                translate: "Impuestos Inmuebles",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "location_city",
                url: "ui/management/impuestos_inm",
                permission: "PAGES_MANAGEMENT_IMPUESTOS_INM",
            },
            {
                id: "impuestos_tsg",
                title: "Impuestos TSG",
                translate: "Impuestos TSG",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "location_city",
                url: "ui/management/impuestos_tsg",
                permission: "PAGES_MANAGEMENT_IMPUESTOS_TSG",
            }
        ],
    },
    {
        id: "management",
        title: "Management",
        translate: "NAV.MANAGEMENT.TITLE",
        type: "group",
        permission: "PAGES_MANAGMENT",//"PAGES_SECURITY",
        children: [
            {
                id: "perfil",
                title: "Mi Perfil",
                translate: "Mi Perfil",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "perm_identity",
                url: "ui/auth/miperfil",
                permission: "PAGE_MI_PERFIL",
            },
            {
                id: "usuarios",
                title: "Usuarios",
                translate: "Usuarios",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "user_group",
                url: "ui/management/usuarios",
                permission: "PAGE_MANAGMENT_USUARIOS",
            },
            {
                id: "report_deudores",
                title: "Deudores por Zonas",
                translate: "Deudores por Zonas",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "user_group",
                url: "ui/report/deudores-zonas",
                permission: "PAGE_REPORT_DEUDORES_ZONAS",
            }
        ],
    },    
];
