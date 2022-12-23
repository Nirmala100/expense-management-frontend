import React from 'react';
//stateless component
const CategorySingle = ({item}) => (
    <div class="collection">
        <span class="badge"></span>{item.name}
    </div>
);

export default CategorySingle;
