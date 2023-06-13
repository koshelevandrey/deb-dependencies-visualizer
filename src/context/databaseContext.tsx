import React, { useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";
// Required to let webpack know it needs to copy the wasm file to our assets
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import { DatabaseContextType } from "../types/packagesGraph.types";

export const DatabaseContext = React.createContext<DatabaseContextType | null>(
  null
);

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [database, setDatabase] = useState<Database | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    const initDatabase = async () => {
      try {
        const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
        const dataPromise = fetch("./packages.sqlite").then((res) =>
          res.arrayBuffer()
        );
        const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
        const db = new SQL.Database(new Uint8Array(buf));
        setDatabase(db);
      } catch (error) {
        setError(error);
      }
    };

    initDatabase();
  }, []);

  if (error) {
    return <div>Failed to connect to database: {error.toString()}</div>;
  }

  if (!database) {
    return <div>Connecting to database...</div>;
  }

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};
