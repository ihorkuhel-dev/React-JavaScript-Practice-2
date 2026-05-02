import { removeTokens } from './cookies';

type AppEvents = {
    'logout': undefined;
    'switch-theme': undefined;
    'open-user': undefined;
};

class AppDispatch {
    private target = new EventTarget();

    dispatch<K extends keyof AppEvents>(event: K, detail?: AppEvents[K]) {
        this.target.dispatchEvent(new CustomEvent(event, { detail }));
    }

    subscribe<K extends keyof AppEvents>(event: K, listener: (detail: AppEvents[K]) => void) {
        const handler = (e: Event) => listener((e as CustomEvent<AppEvents[K]>).detail);
        this.target.addEventListener(event, handler);
        return () => this.target.removeEventListener(event, handler);
    }
}

export const appDispatch = new AppDispatch();
appDispatch.subscribe('logout', () => {
    removeTokens();
    window.location.href = '/login';
});
