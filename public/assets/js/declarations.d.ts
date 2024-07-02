// https://stackoverflow.com/questions/70682803/typescript-errors-when-using-a-suffix-raw-url-etc

declare module "*?raw"
{
    const content: string;
    export default content;
}
