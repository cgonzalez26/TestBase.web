import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { locale as english } from "./i18n/en";
import { locale as spanish } from "./i18n/es";
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
     //@BlockUI('bw-blockui') blockUI: NgBlockUI;
     //@BlockUI('bw-blockui-computers') computersBlockUI: NgBlockUI;
     @BlockUI('bw-blockui-impuestos-aut') impuestosAutBlockUI: NgBlockUI;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _router: Router,
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false,
                },
                toolbar: {
                    hidden: false,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: false,
                },
            },
        };
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit() {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        this.impuestosAutBlockUI.start();
        setTimeout(() => {
            this.impuestosAutBlockUI.stop(); // Stop blocking
          }, 1000);
    }

    goToImpuestosAut(){        
        this._router.navigate(['ui/impuestos_aut']);  
    }
}
