import { Link } from "../../db/schema.js";

export const handleCreateLink = async (linkData, user) => {
    try {
        const link = await Link.findOne({ title: linkData.title });

        if (link) {
            throw new Error("Link with this title already exists");
        }

        const response = await Link.create({
            title: linkData.title,
            description: linkData.description,
            type: linkData.type,
            url: linkData.url,
            thumbnail: linkData.thumbnail,
            user: user
        });

        return response;
    } catch (error) {
        console.error("Error on creating Link:", error.message);
        throw error;
    }
};

export const handleGetAllLinks = async (user) => {
    try {
        const links = await Link.find({ user: user });
        return links;
    } catch (error) {
        console.error("Error on getting all links:", error.message);
        throw error;
    }
};

export const handleGetLinkForUser = async (linkId) => {
    try {
        const link = await Link.findById(linkId);
        return link;
    } catch (error) {
        console.error("Error on fetching a link:", error.message);
        throw error;
    }
};

export const handleUpdateLinkForUser = async (linkId, linkData) => {
    try {
        const updatedLink = await Link.findByIdAndUpdate(
            linkId,
            {
                title: linkData.title,
                description: linkData.description,
                url: linkData.url
            },
            { new: true }
        );
        return updatedLink;
    } catch (error) {
        console.error("Error on updating link data:", error.message);
        throw error;
    }
};

export const updateFavorite = async (linkId, favorite) => {
    try {
        const updatedLink = await Link.findByIdAndUpdate(
            linkId,
            {
                isFavorite: favorite
            },
            { new: true }
        );
        return updatedLink;
    } catch (error) {
        console.error("Error on updating Favorite boolean:", error.message);
        throw error;
    }
};