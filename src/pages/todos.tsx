import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import List from "@/components/List";

const Todos = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    if (!sessionData) {
      void router.push("/")
    }
  }, [sessionData])

  return (
    <Layout>
      <Form
        setActiveTab={setActiveTab}
      />
      <List
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Layout>
  )
}

export default Todos;

