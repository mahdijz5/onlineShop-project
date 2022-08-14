import Head from "next/head";

const Meta = ({title,description,keyword}) => {
		const titleTxt = `My shop | ${title}`
	return (
		<>
			<Head>
				<title>{titleTxt}</title>
				<meta name="description" content={description} />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content={keyword}/>
				
			</Head>
		</>
	);
};

Meta.defaultProps ={ 
    title : "404",
    description: "this is the my shop",
    keyword : "digital product sell shop لوازم دیجیتای فروش فروشگاه",
}

export default Meta;
