import UpdateForm from "@/app/(components)/UpdateForm";

const getPersonById = async (id) => {
  try {
    console.log("going in");
    const res = await fetch(`https://vercel-se.vercel.app/api/Persons/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch person");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }) => {
  let updatePersonData = await getPersonById(params.id);
  updatePersonData = updatePersonData.foundPerson;
  return <UpdateForm person={updatePersonData} />;
};

export default page;
