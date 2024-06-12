declare namespace google {
    namespace accounts {
        namespace id {
            function initialize(options: {
                client_id: string;
                callback: (value: any) => void;
            }): void;
            function renderButton(
                element: HTMLElement,
                options: { theme: string; size: string; text: string; width: string },
            ): void;
        }
    }
}
