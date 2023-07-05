
**Objective:** create a simple React POC using the below technologies:

 - TypeScript 
 - [Vite](https://vitejs.dev/guide/)
 - [React Query](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2)
 - [React hooks form](https://www.youtube.com/watch?v=KejZXxFCe2k&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=1)
 - [Tailwind dark/light theme](https://tailwindcss.com/docs/theme)

## Docker configuration

[Ref doc](https://tonie.hashnode.dev/dockerizing-your-react-app-a-step-by-step-guide)

### Docker build manual commands (Dev build):

`docker build -t react-vite-poc . -f .\Dockerfile.dev`

`docker run -p 5173:5173 react-vite-poc`

URL: http://localhost:5173/

### Docker single command using docker-compose

 - Local environment: Uses Dockerfile.dev to build React app and serve using `npm run build`, just as we do it in local.
   `docker-compose --env-file .env.local up -d`
   
 - Production environment: Uses Multi-stage build to build Docker image.
   
   Stage 1 - Build React app.
   
   Stage 2 - Use nginx to serve the builr React app.   
   `docker-compose --env-file .env.prod up -d`


