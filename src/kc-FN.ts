import { KeycloakService,KeycloakOptions } from 'keycloak-angular';




export function _initializeKeycloak(keycloak: KeycloakService) {
  return async () =>
    await keycloak.init({
      config: {
        url: 'http://localhost:8086',
        realm: 'MICROSERVICE',
        clientId: 'ANGULAR',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      loadUserProfileAtStartUp: true,
      bearerExcludedUrls: [
        'main.ts',
        'main.js',
        '/assets',
        '/clients/public',
      ],
      initOptions: {
        onLoad: 'login-required',
        // onLoad: 'check-sso',
        checkLoginIframe: false,
        enableLogging: true,
      },

    })
}
export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        keycloak
          .init({
            config: {
              url: 'http://localhost:8086',
              realm: 'MICROSERVICE',
              clientId: 'ANGULAR',
            },
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer',
            loadUserProfileAtStartUp: true,
            bearerExcludedUrls: [
              'main.ts',
              'main.js',
              '/assets',
              '/clients/public',
            ],
            initOptions: {
              onLoad: 'login-required',
              // onLoad: 'check-sso',
              checkLoginIframe: false,
              enableLogging: true,
            },
            shouldAddToken: (request) => {
              const { method, url } = request;

              const isGetRequest = 'GET' === method.toUpperCase();
              const acceptablePaths = ['/assets', '/clients/public'];
              const isAcceptablePathMatch = acceptablePaths.some((path) =>
                url.includes(path)
              );

              return !(isGetRequest && isAcceptablePathMatch);
            },
          })
          .then(async (loggedIn) => {
            if (loggedIn) {
              console.log('loggedIn: ', {
                username: keycloak.getUsername(),
                roles: keycloak.getUserRoles().join(', '),
              });
              keycloak.loadUserProfile().then((user) => {
                console.log(user?.attributes?.['birthyears']);
              });
            }
            // else
            // await keycloak.login({
            //   redirectUri: window.location.origin
            // });
            resolve();
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };
  // console.log(keycloak);

  // return async () =>
  //   keycloak.init({
  //     config: {
  //       url: 'http://localhost:8086',
  //       realm: 'NODE_JS',
  //       clientId: 'EXPRESS',
  //     },
  //     enableBearerInterceptor: true,

  //     bearerPrefix: 'Bearer',
  //     loadUserProfileAtStartUp: true,
  //     bearerExcludedUrls: ['/assets', '/clients/public'],

  //     initOptions: {
  //       onLoad: 'login-required',
  //       checkLoginIframe: false,
  //       enableLogging: true
  //   },
  //     shouldAddToken: (request) => {
  //       const { method, url } = request;

  //       const isGetRequest = 'GET' === method.toUpperCase();
  //       const acceptablePaths = ['/assets', '/clients/public'];
  //       const isAcceptablePathMatch = acceptablePaths.some((path) =>
  //         url.includes(path)
  //       );

  //       return !(isGetRequest && isAcceptablePathMatch);
  //     },
  //   })
    // .then((auth) => console.log(auth));
    const options: KeycloakOptions = {
            config: {
        url: 'http://localhost:8086',
        realm: 'NODE_JS',
        clientId: 'EXPRESS',
      },
      initOptions: {
        //onLoad: 'check-sso',
        onLoad: 'login-required',
        checkLoginIframe: false
      },
    }
// console.log(keycloak);
// const keycloak = new Keycloak({
//   url: 'http://keycloak-server${kc_base_path}',
//   realm: 'myrealm',
//   clientId: 'myapp'
// });
// const ky=new Keycloak();
// let kc = Keycloak(options);/
//     return () => keycloak.init(options);
}
