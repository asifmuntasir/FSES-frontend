import { useState } from 'react';
import { Search, BookOpen, Users, Clock, FileText, Edit, Eye, Calendar, AlertTriangle, CheckCircle, XCircle, User } from 'lucide-react';


const Supervisor = () => {
    const [currentPage, setCurrentPage] = useState('students');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - eligible students (from office assistant system)
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      supervisor: 'Dr. Smith',
      programme: 'Bachelor of Computer Science',
      evaluationType: 'Final Year Project',
      researchTitle: 'Machine Learning Applications in Healthcare',
      status: 'Title Submitted',
      examinersNominated: true,
      evaluationDate: '2024-06-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Engineering',
      supervisor: 'Prof. Johnson',
      programme: 'Master of Engineering',
      evaluationType: 'Thesis Defense',
      researchTitle: '',
      status: 'Pending Title',
      examinersNominated: false,
      evaluationDate: null
    },
    {
      id: 3,
      name: 'Ali Ahmad',
      department: 'Computer Science',
      supervisor: 'Dr. Smith',
      programme: 'PhD',
      evaluationType: 'Thesis Defense',
      researchTitle: 'Advanced Neural Networks for Natural Language Processing',
      status: 'Ready for Evaluation',
      examinersNominated: true,
      evaluationDate: '2024-07-01'
    }
  ]);

  // Sample examiners data
  const [examiners] = useState([
    { id: 1, name: 'Dr. Ahmad Hassan', department: 'Computer Science', university: 'UTM', type: 'internal' },
    { id: 2, name: 'Prof. Sarah Wilson', department: 'Computer Science', university: 'UTM', type: 'internal' },
    { id: 3, name: 'Dr. Michael Brown', department: 'Engineering', university: 'UTM', type: 'internal' },
    { id: 4, name: 'Prof. Lisa Chen', department: 'Computer Science', university: 'NUS', type: 'external' },
    { id: 5, name: 'Dr. David Kim', department: 'AI Research', university: 'MIT', type: 'external' },
    { id: 6, name: 'Dr. Maria Garcia', department: 'Mathematics', university: 'UTM', type: 'internal' }
  ]);

  const [formData, setFormData] = useState({
    researchTitle: '',
    examiner1: '',
    examiner2: '',
    examiner3: '',
    examiner1Name: '',
    examiner1Email: '',
    examiner1University: '',
    examiner2Name: '',
    examiner2Email: '',
    examiner2University: '',
    postponementReason: '',
    postponementType: '',
    postponementDate: '',
    comments: ''
  });

  const openModal = (type, student = null) => {
    setModalType(type);
    setSelectedStudent(student);
    if (student && type === 'title') {
      setFormData({ ...formData, researchTitle: student.researchTitle || '' });
    } else if (type === 'postponement') {
      setFormData({
        ...formData,
        postponementReason: '',
        postponementType: '',
        postponementDate: '',
        comments: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setFormData({
      researchTitle: '',
      examiner1: '',
      examiner2: '',
      examiner3: '',
      examiner1Name: '',
      examiner1Email: '',
      examiner1University: '',
      examiner2Name: '',
      examiner2Email: '',
      examiner2University: '',
      postponementReason: '',
      postponementType: '',
      postponementDate: '',
      comments: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'title') {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, researchTitle: formData.researchTitle, status: 'Title Submitted' }
          : s
      ));
    } else if (modalType === 'examiners') {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, examinersNominated: true, status: 'Examiners Nominated' }
          : s
      ));
    } else if (modalType === 'postponement') {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, status: `Postponement Requested - ${formData.postponementType}` }
          : s
      ));
    }
    
    closeModal();
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.programme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready for Evaluation':
        return 'bg-green-100 text-green-800';
      case 'Title Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Title':
        return 'bg-yellow-100 text-yellow-800';
      case 'Examiners Nominated':
        return 'bg-purple-100 text-purple-800';
      default:
        if (status.includes('Postponement')) {
          return 'bg-red-100 text-red-800';
        }
        return 'bg-gray-100 text-gray-800';
    }
  };

  const StudentListing = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-burgundy-700">Student Management</h2>
        <div className="text-sm text-gray-600">
          Supervisor: Dr. Smith
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-burgundy-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Research Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{student.programme}</div>
                      <div className="text-sm text-gray-500">{student.evaluationType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {student.researchTitle || 'Not submitted'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('title', student)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit Research Title"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        onClick={() => openModal('examiners', student)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Nominate Examiners"
                      >
                        <Users size={16} />
                      </button>
                      <button
                        onClick={() => openModal('postponement', student)}
                        className="text-orange-600 hover:text-orange-900 p-1"
                        title="Postponement Request"
                      >
                        <Clock size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ResearchTitleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="mr-2" size={20} />
          Enter Research Title - {selectedStudent?.name}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Information
            </label>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm">
                <div><strong>Name:</strong> {selectedStudent?.name}</div>
                <div><strong>Programme:</strong> {selectedStudent?.programme}</div>
                <div><strong>Department:</strong> {selectedStudent?.department}</div>
                <div><strong>Evaluation Type:</strong> {selectedStudent?.evaluationType}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Research Title *
            </label>
            <textarea
              value={formData.researchTitle}
              onChange={(e) => setFormData({ ...formData, researchTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              rows="3"
              placeholder="Enter the complete research title"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-burgundy-700 text-white rounded-md hover:bg-burgundy-800"
            >
              Save Title
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExaminersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="mr-2" size={20} />
          Nominate Examiners - {selectedStudent?.name}
        </h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm">
              <div><strong>Student:</strong> {selectedStudent?.name}</div>
              <div><strong>Research Title:</strong> {selectedStudent?.researchTitle || 'Not submitted'}</div>
            </div>
          </div>

          {/* Examiner 1 - Internal University */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-burgundy-700 mb-3">Examiner 1 (Internal - Same University)</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Examiner *</label>
              <select
                value={formData.examiner1}
                onChange={(e) => setFormData({ ...formData, examiner1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                required
              >
                <option value="">Select Internal Examiner</option>
                {examiners.filter(e => e.type === 'internal').map(examiner => (
                  <option key={examiner.id} value={examiner.name}>
                    {examiner.name} - {examiner.department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Examiner 2 - External University */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-burgundy-700 mb-3">Examiner 2 (External - Other Universities/Faculties)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Examiner Name *</label>
                <input
                  type="text"
                  value={formData.examiner2Name}
                  onChange={(e) => setFormData({ ...formData, examiner2Name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  placeholder="Dr. John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.examiner2Email}
                  onChange={(e) => setFormData({ ...formData, examiner2Email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  placeholder="examiner@university.edu"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">University/Institution *</label>
                <input
                  type="text"
                  value={formData.examiner2University}
                  onChange={(e) => setFormData({ ...formData, examiner2University: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  placeholder="University Name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Examiner 3 - Internal University */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-burgundy-700 mb-3">Examiner 3 (Internal - Same University)</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Examiner *</label>
              <select
                value={formData.examiner3}
                onChange={(e) => setFormData({ ...formData, examiner3: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                required
              >
                <option value="">Select Internal Examiner</option>
                {examiners.filter(e => e.type === 'internal' && e.name !== formData.examiner1).map(examiner => (
                  <option key={examiner.id} value={examiner.name}>
                    {examiner.name} - {examiner.department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-burgundy-700 text-white rounded-md hover:bg-burgundy-800"
            >
              Nominate Examiners
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PostponementModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="mr-2" size={20} />
          Postponement Request - {selectedStudent?.name}
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm">
              <div><strong>Student:</strong> {selectedStudent?.name}</div>
              <div><strong>Current Status:</strong> {selectedStudent?.status}</div>
              <div><strong>Scheduled Date:</strong> {selectedStudent?.evaluationDate || 'Not scheduled'}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Request Type *</label>
            <select
              value={formData.postponementType}
              onChange={(e) => setFormData({ ...formData, postponementType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              required
            >
              <option value="">Select Request Type</option>
              <option value="withdraw">Withdraw</option>
              <option value="postpone">Postpone</option>
              <option value="ongoing">Mark as Ongoing</option>
            </select>
          </div>

          {formData.postponementType === 'postpone' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Proposed Date</label>
              <input
                type="date"
                value={formData.postponementDate}
                onChange={(e) => setFormData({ ...formData, postponementDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
            <textarea
              value={formData.postponementReason}
              onChange={(e) => setFormData({ ...formData, postponementReason: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              rows="3"
              placeholder="Explain the reason for this request"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              rows="2"
              placeholder="Any additional information"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-burgundy-700 text-white rounded-md hover:bg-burgundy-800"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    switch (modalType) {
      case 'title':
        return <ResearchTitleModal />;
      case 'examiners':
        return <ExaminersModal />;
      case 'postponement':
        return <PostponementModal />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-burgundy-700 flex items-center justify-center">
                <div className="text-yellow-400 text-sm font-bold">UTM</div>
              </div>
              <h1 className="ml-3 text-xl font-bold text-burgundy-700">Research Supervisor Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Dr. Smith</span>
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentPage('students')}
              className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                currentPage === 'students'
                  ? 'border-burgundy-500 text-burgundy-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen size={16} />
              <span>My Students</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudentListing />
      </div>

      {/* Modals */}
      {showModal && renderModal()}
    </div>
  );
};

// Custom styles for UTM burgundy color
const style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule(`
  .text-burgundy-700 {
    color: #8E2246;
  }
`);
style.sheet.insertRule(`
  .bg-burgundy-700 {
    background-color: #8E2246;
  }
`);
style.sheet.insertRule(`
  .bg-burgundy-800 {
    background-color: #7D1D3F;
  }
`);
style.sheet.insertRule(`
  .hover\\:bg-burgundy-800:hover {
    background-color: #7D1D3F;
  }
`);
style.sheet.insertRule(`
  .border-burgundy-500 {
    border-color: #A52A5A;
  }
`);
style.sheet.insertRule(`
  .focus\\:ring-burgundy-500:focus {
    --tw-ring-color: rgba(165, 42, 90, 0.5);
  }
`);

export default Supervisor;