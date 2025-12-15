import React from 'react';

interface ResearchRecordItemProps {
  title: string;
  department: string;
  status: 'ongoing' | 'approved';
  dateSubmitted: string;
}

const ResearchRecordItem: React.FC<ResearchRecordItemProps> = ({
  title,
  department,
  status,
  dateSubmitted
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr] gap-6 items-center">
        
        {/* Research Title */}
        <div>
          <div className="text-xs text-gray-500 font-medium mb-2">Research Title</div>
          <div className="flex items-center gap-3">
            <i className="fas fa-folder text-2xl text-orange-400"></i>
            <span className="font-semibold text-gray-800">{title}</span>
          </div>
        </div>

        {/* Department */}
        <div>
          <div className="text-xs text-gray-500 font-medium mb-2">Department</div>
          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-building text-gray-400"></i>
            <span>{department}</span>
          </div>
        </div>

        {/* Status */}
        <div>
          <div className="text-xs text-gray-500 font-medium mb-2 text-center">Status</div>
          <div className="flex justify-center">
            <span
              className={`px-4 py-1.5 rounded-full font-medium text-sm inline-flex items-center ${
                status === 'ongoing'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              <i className={`fas ${status === 'ongoing' ? 'fa-circle' : 'fa-circle'} mr-2 text-xs`}></i>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Date Submitted */}
        <div>
          <div className="text-xs text-gray-500 font-medium mb-2 text-center">Date Submitted</div>
          <div className="flex justify-center items-center gap-2 text-gray-700">
            <i className="fas fa-calendar-alt text-gray-400"></i>
            <span>{dateSubmitted}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResearchRecordItem;