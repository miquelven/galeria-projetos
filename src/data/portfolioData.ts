import img1 from "../assets/img-1.png";
import img2 from "../assets/img-2.png";
import img3 from "../assets/img-3.png";
import img4 from "../assets/img-4.png";
import img5 from "../assets/img-5.png";
import img6 from "../assets/img-6.png";
import img7 from "../assets/img-7.png";
import img8 from "../assets/img-8.png";
import img9 from "../assets/img-9.png";
import img10 from "../assets/img-10.png";
import img11 from "../assets/img-11.png";

export const categories = [
  { id: "todos", name: "Todos" },
  { id: "padaria", name: "Padaria/Restaurante" },
  { id: "tatuagem", name: "Tatuagem" },
  { id: "cabeleireiro", name: "Cabeleireiro" },
  { id: "dentista", name: "Dentista" },
];

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  category?: string;
}

export const projects: Record<string, Project[]> = {
  layouts: [
    {
      id: "layout-1",
      title: "Dentista 2",
      description: "",
      image: img1,
      tags: [],
      demoUrl: "https://dentista-2-u3h5.vercel.app/",
      category: "dentista",
    },
    {
      id: "layout-2",
      title: "Bakery",
      description: "",
      image: img2,
      tags: [],
      demoUrl: "https://bakery-psi-two.vercel.app/",
      category: "padaria",
    },
    {
      id: "layout-3",
      title: "Tattoo 1",
      description: "",
      image: img3,
      tags: [],
      demoUrl: "https://tattoo1-flame.vercel.app/",
      category: "tatuagem",
    },
    {
      id: "layout-4",
      title: "Cabeleireiro 3",
      description: "",
      image: img4,
      tags: [],
      demoUrl: "https://cabeleireiro-3.vercel.app/",
      category: "cabeleireiro",
    },
    {
      id: "layout-5",
      title: "Dentista 1",
      description: "",
      image: img5,
      tags: [],
      demoUrl: "https://dentista-1.vercel.app/",
      category: "dentista",
    },
    {
      id: "layout-6",
      title: "Tattoo 3",
      description: "",
      image: img6,
      tags: [],
      demoUrl: "https://tattoo3-ashy.vercel.app/",
      category: "tatuagem",
    },
    {
      id: "layout-7",
      title: "Cabeleireiro 2",
      description: "",
      image: img7,
      tags: [],
      demoUrl: "https://cabeleireiro-2.vercel.app/",
      category: "cabeleireiro",
    },
    {
      id: "layout-8",
      title: "Dentista 3",
      description: "",
      image: img8,
      tags: [],
      demoUrl: "https://dentista-3.vercel.app/",
      category: "dentista",
    },
    {
      id: "layout-9",
      title: "Tattoo 2",
      description: "",
      image: img9,
      tags: [],
      demoUrl: "https://tattoo2-topaz.vercel.app/",
      category: "tatuagem",
    },
    {
      id: "layout-10",
      title: "Cabeleireiro 1",
      description: "",
      image: img10,
      tags: [],
      demoUrl: "https://cabeleireiro-1.vercel.app/",
      category: "cabeleireiro",
    },
    {
      id: "layout-11",
      title: "Restaurante",
      description: "",
      image: img11,
      tags: [],
      demoUrl: "https://mi-restaurant-whji.vercel.app/",
      category: "padaria",
    },
  ],
};
