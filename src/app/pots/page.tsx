import Layout from "../../components/Layout";
import { getPots } from "../../../lib/pots";
import PotsClient from "./PotsClient";

export default async function PotsPage() {
    const pots = await getPots();

    return (
        <Layout>
            <PotsClient pots={pots} />
        </Layout>
    );
}
