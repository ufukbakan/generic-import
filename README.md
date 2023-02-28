<h1 align=center>generic-import</h1>
<p align=center>Iterable, recursive, generic, cumulative imports.</p>
<h2>Usage</h2>

```ts
import genericImport from "generic-import";
...express backend initial code

interface MyRouterInterface {
    basepath: string,
    router: Router // imported from express
}

const routesPath = path.join(process.cwd(), "routes");
const routers = genericImport<MyRouterInterface>(routesPath);
// [
//     { filename: "router1", value: Object },
//     { filename: "router2", value: Object },
// ]
for(const r of routers){ // for of loop supported in only ES syntax
    app.use(r.value.basepath, r.value.router);
}

app.listen(8080);
```
<h2>Why use this approach?</h2>
It provides no coupling between main script file and route files. So there is much more scalable code.

<h2>Options</h2>

- **camelize** *boolean* Camelizes returned file names of modules
- **fileExtensions** *array* Dot prefixed file extensions to include in search
- **recursive** *boolean* Enables search in nested folders

<h3>Forked from import-modules</h3>