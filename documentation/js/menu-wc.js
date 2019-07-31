'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">thelinkstore-nest-v6.0.0 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ArticlesModule.html" data-type="entity-link">ArticlesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' : 'data-target="#xs-controllers-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' :
                                            'id="xs-controllers-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' }>
                                            <li class="link">
                                                <a href="controllers/ArticlesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArticlesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' : 'data-target="#xs-injectables-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' :
                                        'id="xs-injectables-links-module-ArticlesModule-b55095f7b25f1c19e97edfd751807dac"' }>
                                        <li class="link">
                                            <a href="injectables/ArticlesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ArticlesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' : 'data-target="#xs-controllers-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' :
                                            'id="xs-controllers-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' : 'data-target="#xs-injectables-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' :
                                        'id="xs-injectables-links-module-AuthModule-0521c60ed5c4592ad6987078246f6636"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FacebookStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FacebookStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwitterStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TwitterStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link">DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' : 'data-target="#xs-controllers-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' :
                                            'id="xs-controllers-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' : 'data-target="#xs-injectables-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' :
                                        'id="xs-injectables-links-module-UsersModule-e08984e516594ed39971a102c4a855b5"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppGateway.html" data-type="entity-link">AppGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArticlesGateway.html" data-type="entity-link">ArticlesGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/DoStuff.html" data-type="entity-link">DoStuff</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentService.html" data-type="entity-link">EnvironmentService</a>
                            </li>
                            <li class="link">
                                <a href="classes/IoConnector.html" data-type="entity-link">IoConnector</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ArticleIdMiddleware.html" data-type="entity-link">ArticleIdMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/articleValidatorMiddleware.html" data-type="entity-link">articleValidatorMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/bodyValidatorMiddleware.html" data-type="entity-link">bodyValidatorMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link">LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedVariables.html" data-type="entity-link">SharedVariables</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TenantMiddleware.html" data-type="entity-link">TenantMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenMiddleware.html" data-type="entity-link">TokenMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserIdMiddleware.html" data-type="entity-link">UserIdMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Verifier.html" data-type="entity-link">Verifier</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link">RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IArticle.html" data-type="entity-link">IArticle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConfig.html" data-type="entity-link">IConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnvironmentConfig.html" data-type="entity-link">IEnvironmentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFacebookConfig.html" data-type="entity-link">IFacebookConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGoogleConfig.html" data-type="entity-link">IGoogleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJwtPayload.html" data-type="entity-link">IJwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IToken.html" data-type="entity-link">IToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITwitterConfig.html" data-type="entity-link">ITwitterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});