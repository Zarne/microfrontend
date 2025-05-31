
import { getDynamicScript, getRemoteModuleId } from './mf-dynamic-remote-component-1.2.1/index.js';


window.remoteMFStore = window.remoteMFStore || {};


export function getRemoteModule(remote, fallback, props = {}) {
            return getDynamicScript(remote)
                        .then(() => window[remote.scope].init())
                        .then(() => window[remote.scope].get(remote.module))
        }



export function getModuleComponent(remote, fallback, props = {}) {
    const id = getRemoteModuleId(remote);
    const existingModule = window.remoteMFStore[id];
    if (existingModule) {
        return existingModule;
    }
    window.remoteMFStore[id] = getRemoteModule(remote, fallback, props)
                        .then(factory => factory()[remote.comp || 'default'])
                        .catch(err => {
                            console.error(`Error loading remote module: ${remote.scope}/${remote.module}`, err);
                            return fallback;
                        })
                        .then(comp => {

                                const returnComp = (typeof comp === "function")? comp(props): comp;
                                /* Returning a component directly since React.lazy expects a module with a default export */
                                return {
                                  default: () => returnComp
                                }
                            }
                        );
    return window.remoteMFStore[id];
}


export function getModuleService(remote, fallback, props = {}) {
    const id = getRemoteModuleId(remote);
    const existingModule = window.remoteMFStore[id];
    if (existingModule) {
        return existingModule;
    }

    window.remoteMFStore[id] = getRemoteModule(remote, fallback, props)
                        .then(factory => factory()[remote.comp || 'default'])
                        .catch(err => {
                            console.error(`Error loading remote module: ${remote.scope}/${remote.module}`, err);
                            return fallback;
                        })
                        .then(comp => {
                                return comp;
                            }
                        );
    return window.remoteMFStore[id];

}
