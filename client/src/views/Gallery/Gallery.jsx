import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
//import DarkNavBar from "../../components/NavBar/DarkNavBar";
import GalleryItem from "./GalleryItem";
import SearchBar from './Search';
import FilterComponent from './FilterComponent';
//testing GalleryItems
import { getGalleryObjects } from '../../Utils/requests';
import "./Gallery.less"
import PropTypes from 'prop-types';


const Gallery = (props) => {

    /*The gallery page will need to have lazy loading implemented
    Therefore, we need to store ALL gallery objects, all which have been loaded (for searching), 
    and all which are being rendered currently (for lazy loading)
     */
    const [galleryObjects, setGalleryObjects] = useState(undefined);
    const [renderedGalleryItems, setRenderedGalleryItems] = useState(undefined);
    const [loadedGalleryItems, setLoadedGalleryItems] = useState(undefined);

    function filterUpdate(value, loadedGalleryItems) {
        const filteredGalleryItems = loadedGalleryItems?.filter((item) => {
            return item.props.Title.toLowerCase().includes(value.toLowerCase()) || item.props.User_name.toLowerCase().includes(value.toLowerCase());
        });
        renderInRows(filteredGalleryItems);
    }

    function renderInRows(items) {
        let rows = [];
        let row = [];
        for (let i = 0; i < items.length; i++) {
            row.push(items[i]);
            if (row.length === 4) {
                rows.push(<div key={"row" + i} className="flex flex-row galleryRows">{row}</div>);
                row = [];
            }
        }
        if (row.length > 0) {
            rows.push(<div key={"row" + items.length} className="flex flex-row galleryRows">{row}</div>);
        }
        setRenderedGalleryItems(rows);
    }


    useEffect(() => {
        getGalleryObjects().then((response) => {
            setGalleryObjects(response.data);
            //Convert gallery objects into JSX gallery items
            //x is the max number of gallery items to display on load
            const x = Math.min(12, response.data?.length || 0);
            let tempItems = [];
            try {
                for (let i = 0; i < x; i++) {
                    const it = response.data[i];
                    tempItems.push(<GalleryItem key={it.id} Title={it.Title} User_name={it.User_name} like_count={it.like_count} view_count={it.view_count} posted={it.updated_at} />);
                }
            } catch (e) {
                console.log("Error in gallery objects");
                console.log(e);
                console.log(tempItems);
            }
            setLoadedGalleryItems(tempItems);
            renderInRows(tempItems);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <>
            <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'}>
            <NavBar isDarkMode ={props.isDarkMode}/>
                <h1 className={props.isDarkMode ? "gallery gallery-dark" : "gallery"}>Gallery</h1>
                <SearchBar filterUpdate={filterUpdate} loadedGalleryItems={loadedGalleryItems} />
                <div className='flex flex-row'>
                    <div className='flex flex-column filterCol'>
                        <FilterComponent />
                    </div>
                    <div className='flex flex-column'>
                        {renderedGalleryItems}
                    </div>
                </div>
            </div>
        </>
    );
}

Gallery.propTypes = {
    isDarkMode: PropTypes.bool.isRequired
}

export default Gallery;