import { Project, SyntaxKind, SourceFile } from 'ts-morph';

const tsconfigs: { name: string, path: string }[] = [
  { name: 'TypeScript', path: '../TypeScript/src/compiler/tsconfig.json' },
  { name: 'VSCode', path: '../vscode/src/tsconfig.json' },
  { name: 'FluentUI', path: '../fluentui/packages/office-ui-fabric-react/tsconfig.json' },
];

function countNodesOfKind(sourceFiles: SourceFile[], syntaxKind: SyntaxKind) {
  return sourceFiles.flatMap(sourceFile => sourceFile.getDescendantsOfKind(syntaxKind)).length;
}

for (const tsconfig of tsconfigs) {
  const project = new Project({
    tsConfigFilePath: tsconfig.path
  });
  const sourceFiles = project.getSourceFiles();
  const types = countNodesOfKind(sourceFiles, SyntaxKind.TypeAliasDeclaration);
  const interfaces = countNodesOfKind(sourceFiles, SyntaxKind.InterfaceDeclaration);
  const classes = countNodesOfKind(sourceFiles, SyntaxKind.ClassDeclaration);
  console.log(tsconfig.name, tsconfig.path, { types, interfaces, classes });
}
