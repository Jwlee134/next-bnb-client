import Room from "models/Room";
import { NextApiRequest, NextApiResponse } from "next";
import { addHours, eachDayOfInterval, addMonths } from "date-fns";
import { IRoomDetail } from "types/room";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const {
        latitude,
        longitude,
        checkIn,
        checkOut,
        adults,
        children,
        page,
        limit,
        roomType,
        minPrice,
        maxPrice,
      } = req.query;

      let formatDates: string[] = [];

      if (checkIn && checkOut) {
        // 체크인, 체크아웃 날짜를 포함한 사이의 날짜들의 배열
        const datesArray = eachDayOfInterval({
          start: new Date(checkIn as string),
          end: new Date(checkOut as string),
        });
        // 데이터베이스에 저장된 날짜의 형식으로 포맷
        formatDates = datesArray.map((date) => {
          return addHours(date, 12).toISOString();
        });
      }

      const data: IRoomDetail[] = await Room.find({
        // 숙소의 위도 경도가 현재 위도 경도 기준 ±0.5 이내인 것들로 필터링
        latitude: {
          $gte: Number(latitude) - 0.5,
          $lte: Number(latitude) + 0.5,
        },
        longitude: {
          $gte: Number(longitude) - 0.5,
          $lte: Number(longitude) + 0.5,
        },
        // 호스트가 설정해둔 예약 불가 날짜에 체크인, 체크아웃 날짜가 포함되어 있으면 필터링
        blockedDayList: {
          $nin: formatDates,
        },
        // 최대 게스트 인원이 숙소 최대 게스트 인원보다 높으면 필터링
        maximumGuestCount: {
          $gte: Number(adults) + Number(children),
        },
        // 기본적으로 예약 차단(0)이면 필터링
        availability: {
          $gte: 1,
        },
        // 검색 필터(집 전체, 개인실, 다인실)
        roomType: {
          $in: roomType,
        },
        // 가격 필터
        price: {
          $gte: Number(minPrice) || 0,
          $lte: Number(maxPrice) || 10000000000,
        },
      });
      // 호스트가 설정해둔 최대 예약 가능 월보다 체크인, 체크아웃 날짜가 넘어가면 필터링
      if (checkIn && checkOut) {
        const filteredByAvailability = data.filter((room) => {
          // 항상 가능이면 필터링하지 않음
          if (room.availability === 1) return true;
          const availability = addMonths(new Date(), room.availability);
          const checkInDate = addHours(new Date(checkIn as string), -3);
          const checkOutDate = addHours(new Date(checkOut as string), -3);
          return availability >= checkInDate && availability >= checkOutDate;
        });
        const slicedFiltered = filteredByAvailability.slice(
          (Number(page) - 1) * Number(limit),
          Number(page) * Number(limit)
        );
        return res.status(200).json({
          data: slicedFiltered,
          originalLength: filteredByAvailability.length,
        });
      }

      const slicedData = data.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
      );
      return res.status(200).json({
        data: slicedData,
        originalLength: data.length,
      });
    } catch (error) {
      return res.status(500).end();
    }
  }
  return res.status(405).end();
};
