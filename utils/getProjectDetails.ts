interface Response {
  success: boolean;
  message: string;
}
export async function getProjectDetails(userId: string): Promise<Response> {
  try {
    const token = localStorage.getItem("token"); // Replace with your actual token
    const response = await fetch(
      ``${process.env.NEXT_PUBLIC_API_URL}/api/projects/student/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return { success: true, message: "" };
    } else {
      // handle error console.error("Failed to fetch audit-logs")
      return {
        success: false,
        message: "Something went wrong. User details was not fetched.",
      };
    }
  } catch (e) {
    return {
      success: false,
      message: JSON.stringify(e),
    };
  }
}
