The objective is to create a simple React POC using the below technologies:
TypeScript 

Vite: https://vitejs.dev/guide/

React Query: https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2

React hooks form: https://www.youtube.com/watch?v=KejZXxFCe2k&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=1

Tailwind dark/light theme: https://tailwindcss.com/docs/theme

Docker configuration: https://tonie.hashnode.dev/dockerizing-your-react-app-a-step-by-step-guide
Terminal commands:

docker build -t react-vite-poc . -f .\Dockerfile.dev

docker run -p 5173:5173 react-vite-poc

URL: http://localhost:5173/
