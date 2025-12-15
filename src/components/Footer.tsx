import React from 'react';

const DocumentFooter = ({ 
  documentNo = "UEP-URDS-FM-005", 
  revisionNo = "00", 
  effectivityDate = "SEPTEMBER 12, 2022" 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="border-2 border-black">
        <div className="grid grid-cols-3">
          {/* Document Number */}
          <div className="border-r-2 border-black p-2">
            <div className="text-xs font-bold mb-1">DOCUMENT NO.:</div>
            <div className="text-sm font-semibold text-center">{documentNo}</div>
          </div>
          
          {/* Revision Number */}
          <div className="border-r-2 border-black p-2">
            <div className="text-xs font-bold mb-1">REVISION NO.:</div>
            <div className="text-sm font-semibold text-center">{revisionNo}</div>
          </div>
          
          {/* Effectivity Date */}
          <div className="p-2">
            <div className="text-xs font-bold mb-1">EFFECTIVITY:</div>
            <div className="text-sm font-semibold text-center">{effectivityDate}</div>
          </div>
        </div>
      </div>
       </div>
      
  );
};

export default DocumentFooter;