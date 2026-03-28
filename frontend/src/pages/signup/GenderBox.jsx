const GenderBox = ({ onCheckboxChange, selectedGender }) => {
    return (
      <div className="flex gap-4 mt-2">
          <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-all ${selectedGender === 'male' ? 'border-blue-500 bg-blue-500/10' : 'border-base-300 hover:border-base-content/30'}`}>
              <input type="checkbox" className="checkbox checkbox-sm checkbox-info"
                  checked={selectedGender === 'male'}
                  onChange={() => onCheckboxChange("male")}
              />
              <span className="text-sm font-medium text-base-content/70">Male</span>
          </label>
          
          <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-all ${selectedGender === 'female' ? 'border-blue-500 bg-blue-500/10' : 'border-base-300 hover:border-base-content/30'}`}>
              <input type="checkbox" className="checkbox checkbox-sm checkbox-info"
                  checked={selectedGender === 'female'}
                  onChange={() => onCheckboxChange("female")}
              />
              <span className="text-sm font-medium text-base-content/70">Female</span>
          </label>
      </div>
    )
}
  
export default GenderBox;