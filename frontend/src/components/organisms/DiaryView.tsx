import React, { useState } from 'react';
import { Button, Input } from '../atoms';
import { DiaryView as DiaryViewType, Diary } from '../types';

interface DiaryViewProps {
  diaryView: DiaryViewType;
  setDiaryView: (view: DiaryViewType) => void;
  darkMode?: boolean;
}

export const DiaryView: React.FC<DiaryViewProps> = ({
  diaryView,
  setDiaryView,
  darkMode = false,
}) => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [newDiaryTitle, setNewDiaryTitle] = useState('');
  const [newDiaryContent, setNewDiaryContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('😊');

  // Home 뷰
  if (diaryView === 'home') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="text-center py-4">
              <h1 className="text-3xl font-bold text-gray-900">일기</h1>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#8B7355] p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center border-b-2 border-[#d4c4a8] pb-3">
                📊 종합감정 분석
              </h2>
              <div className="text-gray-900 leading-relaxed text-sm">
                <p className="text-center text-gray-500 py-4">
                  {diaries.length === 0 
                    ? '아직 작성된 일기가 없습니다. 첫 일기를 작성해보세요!'
                    : `총 ${diaries.length}개의 일기가 작성되었습니다.`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => setDiaryView('write')}
                className="bg-gradient-to-br from-white to-[#f5f0e8] rounded-2xl border-2 border-[#8B7355] p-12 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-4xl">✍️</span>
                  <p className="text-2xl font-bold text-gray-900">일기쓰기</p>
                </div>
              </Button>
              <Button
                onClick={() => setDiaryView('list')}
                className="bg-gradient-to-br from-white to-[#f5f0e8] rounded-2xl border-2 border-[#8B7355] p-12 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-4xl">📋</span>
                  <p className="text-2xl font-bold text-gray-900">일기리스트</p>
                </div>
              </Button>
            </div>

            <Button
              onClick={() => setDiaryView('analysis')}
              className="w-full bg-gradient-to-br from-white to-[#f5f0e8] rounded-2xl border-2 border-[#8B7355] p-12 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-3">
                <span className="text-4xl">📈</span>
                <p className="text-2xl font-bold text-gray-900">감정분석 그래프</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Write 뷰
  if (diaryView === 'write') {
    const [selectedDate, setSelectedDate] = useState({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()]
    });
    const [promptText, setPromptText] = useState('');

    const handleSave = () => {
      if (newDiaryTitle.trim() && newDiaryContent.trim()) {
        const newDiary: Diary = {
          id: Date.now().toString(),
          date: `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`,
          title: newDiaryTitle,
          content: newDiaryContent,
          emotion: selectedEmotion,
          emotionScore: 5,
        };
        setDiaries([...diaries, newDiary]);
        setNewDiaryTitle('');
        setNewDiaryContent('');
        setSelectedEmotion('😊');
        setDiaryView('home');
      }
    };

    const handlePromptSubmit = () => {
      if (promptText.trim()) {
        // 프롬프트 처리 로직
        console.log('Prompt submitted:', promptText);
        setPromptText('');
      }
    };

    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f5f1e8]">
        {/* 상단 헤더 - 일기 작성 + 날짜 */}
        <div className="border-b-2 border-[#8B7355] p-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">일기 작성</h1>
              <div className="flex items-center border-2 border-[#8B7355] bg-white">
                <input
                  type="number"
                  value={selectedDate.year}
                  onChange={(e) => setSelectedDate({...selectedDate, year: parseInt(e.target.value) || selectedDate.year})}
                  className="w-20 px-3 py-2 text-center border-r-2 border-[#8B7355] focus:outline-none text-gray-900"
                />
                <input
                  type="number"
                  value={selectedDate.month}
                  onChange={(e) => setSelectedDate({...selectedDate, month: parseInt(e.target.value) || selectedDate.month})}
                  className="w-16 px-3 py-2 text-center border-r-2 border-[#8B7355] focus:outline-none text-gray-900"
                />
                <input
                  type="number"
                  value={selectedDate.day}
                  onChange={(e) => setSelectedDate({...selectedDate, day: parseInt(e.target.value) || selectedDate.day})}
                  className="w-16 px-3 py-2 text-center border-r-2 border-[#8B7355] focus:outline-none text-gray-900"
                />
                <select
                  value={selectedDate.dayOfWeek}
                  onChange={(e) => setSelectedDate({...selectedDate, dayOfWeek: e.target.value})}
                  className="px-3 py-2 focus:outline-none bg-white text-gray-900"
                >
                  {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                    <option key={day} value={day}>{`${day}요일`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 제목란 + 저장 버튼 */}
        <div className="border-b-2 border-[#8B7355] p-4 bg-white">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <label className="text-base font-medium text-gray-900 whitespace-nowrap">제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={newDiaryTitle}
              onChange={(e) => setNewDiaryTitle(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-[#d4c4a8] rounded-lg focus:outline-none focus:border-[#8B7355] bg-white text-gray-900"
            />
            <button
              onClick={handleSave}
              disabled={!newDiaryTitle.trim() || !newDiaryContent.trim()}
              className="px-6 py-2 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#6d5943] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              저장
            </button>
          </div>
        </div>

        {/* 내용란 */}
        <div className="flex-1 overflow-hidden bg-white">
          <div className="max-w-5xl mx-auto h-full p-4">
            <textarea
              placeholder="내용을 입력해주세요"
              value={newDiaryContent}
              onChange={(e) => setNewDiaryContent(e.target.value)}
              className="w-full h-full px-4 py-3 border-2 border-[#d4c4a8] rounded-lg focus:outline-none focus:border-[#8B7355] resize-none bg-white text-gray-900"
            />
          </div>
        </div>

        {/* 하단 프롬프트 입력 */}
        <div className="border-t-2 border-[#8B7355] p-4 bg-[#f5f1e8]">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <input
              type="text"
              placeholder="프롬프트를 입력하세요"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && promptText.trim()) {
                  e.preventDefault();
                  handlePromptSubmit();
                }
              }}
              className="flex-1 px-4 py-3 border-2 border-[#d4c4a8] rounded-lg focus:outline-none focus:border-[#8B7355] bg-white text-gray-900"
            />
            <button
              onClick={handlePromptSubmit}
              disabled={!promptText.trim()}
              className="w-12 h-12 rounded-full bg-[#8B7355] hover:bg-[#6d5943] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List 뷰
  if (diaryView === 'list') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">일기 목록</h1>
              <Button
                onClick={() => setDiaryView('home')}
                variant="ghost"
              >
                ← 돌아가기
              </Button>
            </div>

            {diaries.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-[#8B7355] p-8 shadow-lg">
                <p className="text-center text-gray-500 py-8">
                  작성된 일기가 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {diaries.map((diary) => (
                  <div
                    key={diary.id}
                    className="bg-white rounded-2xl border-2 border-[#8B7355] p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedDiary(diary);
                      setDiaryView('detail');
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{diary.emotion}</span>
                          <h3 className="text-xl font-bold text-gray-900">{diary.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{diary.date}</p>
                        <p className="text-gray-700 line-clamp-2">{diary.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detail 뷰
  if (diaryView === 'detail' && selectedDiary) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">일기 상세</h1>
              <Button
                onClick={() => {
                  setSelectedDiary(null);
                  setDiaryView('list');
                }}
                variant="ghost"
              >
                ← 돌아가기
              </Button>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#8B7355] p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-[#d4c4a8]">
                <span className="text-4xl">{selectedDiary.emotion}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDiary.title}</h2>
                  <p className="text-sm text-gray-500">{selectedDiary.date}</p>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedDiary.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Analysis 뷰
  if (diaryView === 'analysis') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">감정 분석 그래프</h1>
              <Button
                onClick={() => setDiaryView('home')}
                variant="ghost"
              >
                ← 돌아가기
              </Button>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#8B7355] p-8 shadow-lg">
              {diaries.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  분석할 데이터가 없습니다. 일기를 작성해보세요!
                </p>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4">
                      총 {diaries.length}개의 일기가 작성되었습니다.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {['😊', '😢', '😡', '😴', '😃', '😌'].map((emoji) => {
                        const count = diaries.filter(d => d.emotion === emoji).length;
                        const percentage = diaries.length > 0 ? (count / diaries.length) * 100 : 0;
                        return (
                          <div key={emoji} className="bg-[#f5f1e8] rounded-lg p-4">
                            <div className="text-3xl mb-2">{emoji}</div>
                            <div className="text-2xl font-bold text-gray-900">{count}</div>
                            <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
