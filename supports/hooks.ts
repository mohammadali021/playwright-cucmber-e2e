
import {
    Before,
    After,
    setDefaultTimeout,
    IWorld
} from '@cucumber/cucumber';

import { World } from './worlds';
import { setWorld } from './world-instance';

setDefaultTimeout(30000);

Before(async function (this: IWorld, scenario) {
    const current = this as World;

    setWorld(current);

    const scenarioName = scenario.pickle.name;
    const feature = scenario.gherkinDocument.feature;
    const featureName = feature?.name ?? 'No Feature';

    // Find the original Scenario or Scenario Outline AST
    const scenarioAstId = scenario.pickle.astNodeIds[0];

    const scenarioAst = feature?.children
        .find(child => child.scenario?.id === scenarioAstId)
        ?.scenario;

    // Detect Scenario Outline
    const isOutline =
        scenarioAst?.examples?.some(
            example => example.tableBody.length > 0
        ) ?? false;

    let folderName = '';

    if (isOutline) {
        const exampleRowId = scenario.pickle.astNodeIds[1];

        const rows = scenarioAst?.examples.flatMap(
            example => example.tableBody
        ) ?? [];

        const index = rows.findIndex(
            row => row.id === exampleRowId
        );

        folderName = `Example ${index + 1}`;
    }

    await current.init(
        featureName,
        scenarioName,
        folderName
    );
});

After(async function (this: IWorld) {
    const current = this as World;

    await current.close();
});
