import { createBrowserRouter } from "react-router-dom";
import Login from "./features/identity/components/Login";
import Register from "./features/identity/components/Register";
import IdentityLayout from "./layouts/IdentityLayout";
import { registerAction } from "./actions/registerAction";
import { loginAction } from "./actions/loginAction";
import Courses, { coursesLoader } from "./pages/Courses";
import MainLayout from "./layouts/mainLayout/MainLayout";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/components/CourseDetails";
import CourseCategories, { categoriesLoader } from "./pages/CourseCategories";
import { CategoryProvider } from "./features/categories/components/category-context";
import NotFound from "./pages/NotFound";
import UnHandledException from "./pages/UnHandledException";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<UnHandledException />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        path: "course-categories",
        element: (
          <CategoryProvider>
         <CourseCategories />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
  {
    path:"*",
    element:<NotFound />
  }
]);

export default router;
