        import {
        savePainPoint,
        saveUserPainRecord,
        getUserPainRecords
        } from '../api.js';

        global.fetch = jest.fn();

        afterEach(() => {
        fetch.mockClear();
        });

        test('savePainPoint — отправка POST-запроса', async () => {
        const mockData = {
            X_coord: 100,
            Y_coord: 200,
            body_part_id: 1,
            pain_point_name: 'Точка 1',
            pain_point_id: 5
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true })
        });

        const result = await savePainPoint(mockData);

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/SavePainPoints/'),
            expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockData)
            })
        );

        expect(result).toEqual({ success: true });
        });

        test('saveUserPainRecord — отправка записи боли', async () => {
        const mockData = {
            user_id: 1,
            pain_point_id: 5,
            intensity: 7,
            pain_type: "жгучая",
            time_of_day: "утро"
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ status: 'ok' })
        });

        const result = await saveUserPainRecord(mockData);

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/SaveUserPainRecord/'),
            expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockData)
            })
        );

        expect(result).toEqual({ status: 'ok' });
        });

        test('getUserPainRecords — получение записей', async () => {
        const mockResponse = [
            {
            id: 1,
            pain_type: 'тупая',
            intensity: 5,
            record_date: '2024-01-01',
            point_name: 'Темя'
            }
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await getUserPainRecords(1);

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/GetUserPainRecords/?user_id=1')
        );

        expect(result).toEqual(mockResponse);
        });
