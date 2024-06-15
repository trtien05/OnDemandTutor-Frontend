import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";


export default function useDocumentTitle(title: string): void {
    useIsomorphicLayoutEffect(() => {
        window.document.title = title;
    }, [title]);
}