import React from 'react';
import {Card} from "antd";

import "antd/dist/antd.css";

export function Page(
    {
        children,
        title = null,
        ...cardProps
    }
) {
    return (
        <Card title={title} {...cardProps}>
            {children}
        </Card>
    );
}

Page.propTypes = Card.propTypes;