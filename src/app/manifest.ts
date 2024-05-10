import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "APUSH AI",
        short_name: "APUSH AI",
        description: "An AI-powered study tool.",
        start_url: "/",
        display: "fullscreen",
        background_color: "#fff",
        theme_color: "#fff"
    };
}
