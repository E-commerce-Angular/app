import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/inmemory-db/inmemory-db.service";

import { rootRouterConfig } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ErrorHandlerService } from "./shared/services/error-handler.service";

import { AutenticacionService } from "./modules/autenticaciones/services/autenticaciones.service";
import { ProductoService } from "./modules/productos/services/productos.service";

 
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  ],
  declarations: [AppComponent],
  providers: [
    AutenticacionService,
    ProductoService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
