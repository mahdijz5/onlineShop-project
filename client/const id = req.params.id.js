const id = req.params.id
    if (!req.files) {
        return res.status(400).json({ "message": "لطفا تصویری را برای محصول اپلود کنید" })
    }
    const { description, brand: brandTitle, categories, price, discount, name, amount } = await req.body;
    const thumbnail = req.files.thumbnail
    const thumbnailName = `${short.generate()}${short.generate()}_${thumbnail.name}`
    const uploadPath = `${appRoot}/public/uploads/${thumbnailName}`

    try {
        const allCategories = []

        if (!brandTitle || brandTitle == '') {
            return res.status(400).json({ "message": "لطفا برند محصول را وارد کنید" })
        }

        await Product.productValidation({ ...req.body, thumbnail })

        if (categories != '') {
            const everyCategory = _.split(categories, ",")
            everyCategory.map(async (c) => {
                const category = await Category.findOne({ title: c })
                if (!category) {
                    res.status(400).json({ "message": "لطفا مقدار دسته را تغییر ندهید" })
                }
                allCategories.push(category._id)
            })
        }

        const title = brandTitle;
        const brand = await Brand.findOne({ title: title })
        const product = await Product.findOne({ _id: id })
        const prevThumnvail = product.thumbnail;

        product.name = name;
        product.description = description;
        product.brand = brand;
        product.price = parseInt(price);
        product.discount = discount && discount != undefined ? parseInt(discount) : 0;
        product.amount = amount && amount != undefined ? parseInt(amount) : 0;
        product.thumbnail = thumbnailName;
        product.categories = allCategories;

        product.save()

        fs.unlink(`${appRoot}/public/uploads/${prevThumnvail}`, (err) => {
            if (err) next(err)
        })

        thumbnail.mv(uploadPath, (err) => {
            if (err) {
                return next(err);
            }
        })

        res.status(201).json({ "message": "محصول با موفقیت ساخته شد." })
    } catch (error) {
        console.log(error)
        if (error.errors && error.errors.length > 0) {
            res.status(400).json({ "message": error.errors[0] })

        }
        next(error)
    }