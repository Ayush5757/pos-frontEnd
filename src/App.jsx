"use client";
import React from 'react'
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Box, LoadingOverlay  } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import 'react-lazy-load-image-component/src/effects/blur.css';
import routes from "./routes/index.jsx";
import { ErrorBoundary } from 'react-error-boundary';
function App() {
  const queryClient = new QueryClient();
  function handelError(err){
    // console.log('ayushe ',err);    
  }
  return (
    <Box>
      <ErrorBoundary fallbackRender={<p>Something went wrong</p>} onError={handelError}>
        <Notifications position="top-right" />
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
            <RouterProvider router={routes} />
          </Suspense>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    </ErrorBoundary>
    </Box>
  );
}

export default App;
