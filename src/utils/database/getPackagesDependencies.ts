import { Database } from "sql.js";
import { PackagesGraph } from "../../types/packagesGraph.types";

// TODO: add 2nd, 3rd, ... levels of dependency depth
const GET_DEPENDENCIES_SQL = `
SELECT child_package_id, child_package_name, parent_id as parent_package_id, name as parent_package_name  FROM (SELECT
    name as child_package_name,
    child_id as child_package_id,
    parent_id
FROM
    (SELECT * FROM dependencies WHERE child_id = $search_package_id) as dependencies
INNER JOIN packages
    ON packages.package_id = dependencies.child_id) as a
INNER JOIN packages
    ON packages.package_id = a.parent_id
`;

const GET_PACKAGE_BY_NAME_SQL = `
SELECT * FROM packages WHERE name = $package_name
`;

export async function getPackagesDependencies(
  packageName: string,
  database: Database
): Promise<PackagesGraph> {
  return new Promise((resolve, reject) => {
    const getPackageByNameStatement = database.prepare(GET_PACKAGE_BY_NAME_SQL);
    const searchedPackage = getPackageByNameStatement.getAsObject({
      $package_name: packageName,
    }) as { package_id: number; name: string };

    if (!searchedPackage?.package_id) {
      reject(new Error("Couldn't find package in database"));
    }

    const graph: PackagesGraph = { nodes: [], edges: [] };
    const nodesSet = new Set<string>();

    const getDependencyEdgesStatement = database.prepare(GET_DEPENDENCIES_SQL);
    getDependencyEdgesStatement.bind({
      $search_package_id: searchedPackage.package_id,
    });
    while (getDependencyEdgesStatement.step()) {
      const dependencyRow = getDependencyEdgesStatement.getAsObject() as {
        child_package_name: string;
        child_package_id: number;
        parent_package_name: string;
        parent_package_id: number;
      };

      const childPackage = {
        packageName: dependencyRow.child_package_name,
        id: dependencyRow.child_package_id,
      };
      const parentPackage = {
        packageName: dependencyRow.parent_package_name,
        id: dependencyRow.parent_package_id,
      };

      graph.edges.push({
        from: childPackage.id,
        to: parentPackage.id,
      });

      if (!nodesSet.has(childPackage.packageName)) {
        graph.nodes.push({
          id: childPackage.id,
          label: childPackage.packageName,
          title: `${childPackage.packageName} tooltip text`,
        });
        nodesSet.add(childPackage.packageName);
      }

      if (!nodesSet.has(parentPackage.packageName)) {
        graph.nodes.push({
          id: parentPackage.id,
          label: parentPackage.packageName,
          title: `${parentPackage.packageName} tooltip text`,
        });
        nodesSet.add(parentPackage.packageName);
      }
    }

    resolve(graph);
  });
}
