import React from 'react';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Submission {
  id: string;
  name: string;
  email: string;
  cell: string;
  submitted: string;
  status: string;
  statusDescription: string;
  submittedDate: string;
}

interface Props {
  submissions: Submission[];
}

const SubmissionsTable: React.FC<Props> = ({ submissions }) => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-400';
      case 'Approved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const handleView = (id: string) => {
    router.push(`/URDS/Artnomer/CD-RFS?id=${id}`);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Faculty Submissions - College Engineering</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Researcher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Cell
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Research Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{submission.name}</div>
                    <div className="text-sm text-gray-500">{submission.email}</div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">{submission.cell}</td>

                  <td className="px-6 py-4 text-sm text-gray-700">{submission.submitted}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(submission.status)}`} />
                      <span className="text-sm text-gray-700">{submission.status}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">{submission.submittedDate}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleView(submission.id)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                      title="View Submission"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsTable;
