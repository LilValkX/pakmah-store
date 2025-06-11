import Head from "next/head";

export default function Meta({ keywords, description, title }) {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    );
}

Meta.defaultProps = {
    title: "pakmahstore",
    keywords:
        "roblox roblox toycode robux รับเติม robux ขาย toycode pakmah pakmahstore",
    description:
        "Pak mah Store บริการกดผลและเกมพาสทุกแมพที่กดได้เรท10 และมีบริการรับเติมRobuxราคาถูก",
};
