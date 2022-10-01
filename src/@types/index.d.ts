declare module '*.hbs'{
    const view: (data : any) => string;
    export default view;
}

declare module '*.jpg'{
    const view: string;
    export default view;
}

declare module '*.json'{
    const view: any;
    export default view;
}