
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

import FirstLayer from "../Pages/B.A.ShapeFormats/FirstLayer/FirstLayer";
import FiveLayer from "../Pages/B.A.ShapeFormats/FiveLayer/FiveLayer";
import FourthLayer from "../Pages/B.A.ShapeFormats/FourthLayer/FourthLayer";
import SecondLayer from "../Pages/B.A.ShapeFormats/SecondLayer/SecondLayer";
import SevenLayer from "../Pages/B.A.ShapeFormats/SevenLayer/SevenLayer";
import SixLayer from "../Pages/B.A.ShapeFormats/SixLayer/SixLayer";
import ThirdLayer from "../Pages/B.A.ShapeFormats/ThirdLayer/ThirdLayer";
import LayerGuard from "./LayerGuard";

const layerComponents = {
  "first-layer": FirstLayer,
  "second-layer": SecondLayer,
  "third-layer": ThirdLayer,
  "fourth-layer": FourthLayer,
  "fifth-layer": FiveLayer,
  "sixth-layer": SixLayer,
  "seventh-layer": SevenLayer,
};

const LayerRoutes = () => {
  const axiosPublic = useAxiosPublic();

  const { data: field = [], isLoading } = useQuery({
    queryKey: ["field"],
    queryFn: async () => {
      const res = await axiosPublic.get("/layer-management/field");
      return res.data?.data || [];
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Routes>
      {field.map((layer) => {
        const Component = layerComponents[layer.fieldName];
        if (!Component) return null;

        return (
          <Route
            key={layer.fieldName}
            path={`${layer.fieldName}`}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LayerGuard fieldName={layer.fieldName}>
                  <Component />
                </LayerGuard>
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

export default LayerRoutes;
