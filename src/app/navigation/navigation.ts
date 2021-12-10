import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "home_group",
        title: "Home Group",
        translate: "NAV.HOME.TITLE",
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
        ],
    },
    {
        id: "management",
        title: "Management",
        translate: "NAV.MANAGEMENT.TITLE",
        type: "group",
        permission: "PAGES_MANAGEMENT",
        children: [
            {
                id: "establecimientos",
                title: "Establecimientos",
                translate: "Establecimientos",//"NAV.MANAGEMENT.ESTABLECIMIENTOS.TITLE",
                type: "item",
                icon: "location_city",
                url: "ui/management/establecimientos",
                permission: "PAGES_MANAGEMENT_ESTABLECIMIENTOS",
            },
            {
                id: "users",
                title: "Usuarios",
                translate: "NAV.MANAGEMENT.USERS.TITLE",
                type: "item",
                icon: "people",
                url: "ui/management/usuarios",
                permission: "PAGES_MANAGEMENT_USERS",
            },
        ],
    },    
];
