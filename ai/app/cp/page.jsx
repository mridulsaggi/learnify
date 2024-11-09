import React from 'react'
import LeftSidebar from './_components/LeftSidebar';
import RightComponent from './_components/RightComponent';

const page = () => {
    return (
        <div className="flex flex-grow flex-col md:flex-row bg-black min-h-screen p-4">
          <LeftSidebar />
          <RightComponent />
        </div>
      );
}

export default page