import swaggerParser from 'swagger-parser';
import swStats from 'swagger-stats';

  
  export async function loadMonitoringModule(app: any): Promise<void> {
    let options = {
      uriPath: "/monitor",
      swaggerSpec: {name: "Dashboard for API"}
    };
  
    if (options.swaggerSpec && typeof options.swaggerSpec === 'string') {
  
      swaggerParser.default.validate(options.swaggerSpec, (err: Error, api: any) => {
        const swaggerSpec = api;
        app.use(swStats.getMiddleware({ ...options, swaggerSpec }));
      });
  
      return;
    }  
    app.use(swStats.getMiddleware(options));
  }